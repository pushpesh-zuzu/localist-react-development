import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function handler(req, res) {
  const url = req.url || '/'
  
  try {
    // Read the built HTML template
    const templatePath = path.resolve(__dirname, '../dist/client/index.html')
    let template = fs.readFileSync(templatePath, 'utf-8')
    
    // Import the server build
    const { render } = await import('../dist/server/entry-server.js')
    
    // Render the app with proper URL
    const appHtml = await render(url)
    
    // Replace the placeholder with rendered HTML
    const html = template.replace('<!--ssr-outlet-->', appHtml)
    
    // Add proper asset links - replace relative paths with absolute
    const processedHtml = html
      .replace(/src="\/src\//g, 'src="/assets/')
      .replace(/href="\/src\//g, 'href="/assets/')
    
    // Set proper headers
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=86400')
    
    return res.status(200).send(processedHtml)
    
  } catch (error) {
    console.error('SSR Error:', error)
    console.error('Error details:', error.message)
    console.error('Stack:', error.stack)
    
    try {
      // Fallback to client-side rendering
      const templatePath = path.resolve(__dirname, '../dist/client/index.html')
      let template = fs.readFileSync(templatePath, 'utf-8')
      
      // Process assets for fallback too
      const processedTemplate = template
        .replace(/src="\/src\//g, 'src="/assets/')
        .replace(/href="\/src\//g, 'href="/assets/')
      
      res.setHeader('Content-Type', 'text/html')
      return res.status(200).send(processedTemplate)
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError)
      return res.status(500).send('Server Error')
    }
  }
}
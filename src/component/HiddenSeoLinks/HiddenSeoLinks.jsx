import React from "react";
import { megaMenu } from "../../constant/Megamenu";

function HiddenSeoLinks() {
  return (
    <div style={{ display: "none" }}>
      {megaMenu.map((item, i) => (
        <div key={i}>
          <a href={`/en/gb/${item.path}`}>{item.name}</a>
          {item.children && item.children.length > 0 && (
            <div>
              {item.children.map((child, j) => (
                <a key={j} href={`/en/gb/${child.path}`}>
                  {child.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HiddenSeoLinks;

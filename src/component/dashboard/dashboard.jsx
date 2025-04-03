import React, { useState } from "react";
import styles from "./dashboard.module.css";
import vector from "../../assets/Images/Leads/vector.svg";
import downarrow from "../../assets/Images/subcategory/arrowicon.svg"
import uparrow from "../../assets/Images/subcategory/arrowicon.svg"

function Dashboard() {
  const [selectedService, setSelectedService] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What type of property is this for?",
      options: ["Flat", "Apartment", "House", "Commercial Property", "Other"],
    },
    {
      id: 2,
      question: "How many rooms need cleaning?",
      options: ["1 Room", "2 Rooms", "3 Rooms", "4+ Rooms"],
    },
    {
      id: 3,
      question: "Do you need cleaning supplies provided?",
      options: ["Yes", "No, I have my own"],
    },
    {
      id: 4,
      question: "What is your preferred cleaning time?",
      options: ["Morning", "Afternoon", "Evening", "Flexible"],
    },
    {
      id: 5,
      question: "Do you have pets at home?",
      options: ["Yes", "No"],
    },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const services = [
    { id: 1, name: "House Cleaning" },
    { id: 2, name: "Deep Cleaning Services" },
    { id: 3, name: "End of Tenancy Cleaning" },
  ];

  // const toggleQuestion = (index) => {
  //   setOpenQuestion(openQuestion === index ? null : index);
  // };

  return (
    <div className={styles.mainContainer}>
      {/* Left Side UI */}
      <div className={styles.container}>
        <h1 className={styles.heading}>Lead settings</h1>
        <p className={styles.subHeading}>Leads you can choose to contact.</p>

        {/* Your Services */}
        <h2 className={styles.sectionTitle}>Your services</h2>
        <p className={styles.sectionDescription}>
          Fine-tune the leads you want to be alerted about.
        </p>

        {services.map((service) => (
          <div
            key={service.id}
            className={`${styles.serviceCard} ${
              selectedService?.id === service.id ? styles.activeService : ""
            }`}
            onClick={() => setSelectedService(service)}
          >
            <div>
              <div className={styles.serviceTitle}>{service.name}</div>
              <div className={styles.serviceDetails}>All leads | 1 location</div>
            </div>
            <img src={vector} alt="" />
          </div>
        ))}

        <div className={styles.addService}>+ Add a service</div>

        {/* Locations */}
        <h2 className={styles.sectionTitle}>Your locations</h2>
        <p className={styles.sectionDescription}>
          Choose where you want to find new customers.
        </p>

        <div className={styles.locationCard}>
          <div className={styles.locationInfo}>
            <strong>Within 150 miles of 01201</strong>
          </div>
          <div className={styles.locationActions}>
            <span>View on map</span> | <span>Remove</span> | <span>3 services</span>
          </div>
        </div>

        <div className={styles.addService}>+ Add a location</div>

        {/* Online/Remote Leads */}
        <h2 className={styles.sectionTitle}>Online/remote leads</h2>
        <p className={styles.sectionDescription}>
          Customers tell us if they’re happy to receive services online or remotely.
        </p>

        <div className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>See online/remote leads</span>
          <input type="checkbox" defaultChecked />
        </div>

        {/* View Leads Button */}
        <button className={styles.buttons}>View leads</button>
      </div>

      {/* Right Side Panel */}
      <div className={`${styles.rightPanel} ${selectedService ? styles.open : ""}`}>
        {selectedService && (
          <div>
            <button className={styles.closeBtn} onClick={() => setSelectedService(null)}>✖</button>
            <h2 className={styles.panelHeading}>{selectedService.name}</h2>
            <p className={styles.panelSubHeading}>Customer questions</p>
            <p  className={styles.panelSubHeadingText}>Every customer answers this series of questions, allowing you to define exactly which type of leads you see.</p>

            {/* Questions Section */}
            {/* <div className={styles.questions}>
              <div className={styles.question}>
                <button className={styles.questionTitle} onClick={() => toggleQuestion(0)}>
                  What type of property is this for? <img src ={openQuestion === 0 ? downarrow : uparrow} />
                </button>
                {openQuestion === 0 && (
                  <div className={styles.options}>
                    {["Flat", "Apartment", "House", "Commercial Property", "Other"].map((type) => (
                      <label key={type} className={styles.option}>
                        <input
                          type="radio"
                          name="propertyType"
                          value={type}
                          checked={propertyType === type}
                          onChange={() => setPropertyType(type)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div> */}
              <div className={styles.questions}>
        {questions.map((q) => (
          <div key={q.id} className={styles.question}>
            <button className={styles.questionTitle} onClick={() => toggleQuestion(q.id)}>
              {q.question} 
              <img src={openQuestion === q.id ? uparrow : downarrow} alt="toggle" />
            </button>

            <div className={`${styles.options} ${openQuestion === q.id ? styles.show : ""}`}>
              {q.options.map((option) => (
                <label key={option} className={styles.option}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleAnswerChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>


            {/* Buttons */}
            <div className={styles.action}>
              <button className={styles.removeBtn}>🗑 Remove this service</button>
              <button className={styles.saveBtn}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

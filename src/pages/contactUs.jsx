import React, { useState } from "react";
import axios from "axios";

const ContactUs = React.forwardRef((props, ref) => {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // State for errors
  const [response, setResponse] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!message) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(); // Validate inputs
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any
      return;
    }

    try {
      const response = await axios.post(backend_url + "contactUs", {
        name,
        email,
        message,
      });
      // console.log("Response:", response.data);
      // Clear form and errors if needed
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setResponse(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  ///////////////////////
  const stopPropagation = (e) => {
    // e.preventDefault();
    e.stopPropagation();
  };
  ////////////////////
  return (
    <div className="demoPage flip_book_right_background" ref={ref}>
      <div className="tokenomics_element">
        <form onSubmit={handleSubmit} className="contact_us_canvas">
          <div style={{ padding: "0.5vh" }}>
            <input
              className="input_form_element"
              placeholder="Name"
              value={name}
              ///////////////////////////////// onMouseUp={stopPropagation}
              onMouseUpCapture={stopPropagation}
              onChange={(e) => {
                setName(e.target.value);
              }}
              ////////////////////////////////////
            />
            <div style={{ textAlign: "end" }}>
              {errors.name && (
                <span className="input_invalid">{errors.name}</span>
              )}
            </div>
          </div>
          <div style={{ padding: "0.5vh" }}>
            <input
              className="input_form_element"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ textAlign: "end" }}>
              {errors.email && (
                <span className="input_invalid">{errors.email}</span>
              )}
            </div>
          </div>
          <div style={{ padding: "0.5vh" }}>
            <textarea
              className="textarea_form_element"
              placeholder="Message"
              rows={"5"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ textAlign: "end" }}>
              {errors.message && (
                <span className="input_invalid">{errors.message}</span>
              )}
            </div>
          </div>
          <div style={{ width: "100%", padding: "10px" }}>
            <button
              className="submit_button"
              type="submit"
              style={{
                textDecoration: "none",
                width: "100%",
                height: "100%",
              }}
            >
              <span>Submit</span>
            </button>
          </div>
          {response && (
            <div
              style={{
                color: response.success ? "green" : "red",
                fontFamily: "Times New Roman",
              }}
            >
              {response.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
});

export default ContactUs;

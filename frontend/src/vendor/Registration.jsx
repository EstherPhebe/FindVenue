import { useState, useRef } from "react";

function VendorRegistration() {
  const formRef = useRef(null);
  // const nameRef = useRef()
  // const emailRef = useRef()
  // const phoneRef = useRef()
  const [showPassword, setShowPassword] = useState(true);

  async function handleRegister(event) {
    event.preventDefault();

    try {
      let input = {
        name: vendorname.value,
        email: email.value,
        phone: number.value,
      };
      console.log(input);
      const res = await fetch("http://localhost:3007/vendor", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.json());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form ref={formRef}>
        <div>
          <label htmlFor="vendorname">Vendor Name</label>
          <input
            type="text"
            name="vendorname"
            id="vendorname"
            placeholder="Enter business name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Vendor Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter business email"
            required
          />
        </div>
        <div>
          <label htmlFor="number">Vendor Number</label>
          <input
            type="tel"
            name="number"
            id="number"
            placeholder="Enter business number"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />

          {showPassword ? (
            <i
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              show
            </i>
          ) : (
            <i
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              hide
            </i>
          )}
        </div>
        <button onClick={handleRegister} type="submit">
          Register
        </button>
      </form>
    </>
  );
}

export default VendorRegistration;

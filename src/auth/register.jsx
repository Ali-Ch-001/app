import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { username, password };

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }
        return response.json();
      })
      .then(() => {
        setSuccess("Registration successful");
        setUsername('');
      
        setPassword('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xs sm:max-w-md ">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">Twitter</div>
          <div className="text-lg font-bold">Create your Account</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <a href="/login">Already have an account? Login →</a>
          </span>
        </div>
        {error && <div className="text-center" style={{ color: "red" }}>{error}</div>}
        {success && <div className="text-center" style={{ color: "green" }}>{success}</div>}
      </div>
    </div>
  );
}

export default Register;
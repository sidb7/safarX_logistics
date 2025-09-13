// Login.jsx
export default function Login() {
  return (
    <div className="p-6 w-[100%]">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <input className="w-full border p-2 mb-3 rounded" placeholder="Email" />
      <input
        className="w-full border p-2 mb-3 rounded"
        type="password"
        placeholder="Password"
      />
      <button className="w-full bg-[#160783] text-white py-2 rounded">
        Login
      </button>
    </div>
  );
}

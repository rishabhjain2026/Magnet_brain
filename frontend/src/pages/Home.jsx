import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div >
      <header >
        <Link to="/signup" >Signup</Link>
        <br /><br />
        <Link to="/login" >Signin</Link>
      </header>

      <main >
        <h1>Task Management System</h1>
        <p>
          Welcome to our Task Management Project!<br/>
          Create, update, and track tasks with priority levels and due dates.<br/>
          Complete tasks, move them between priorities, and stay organized efficiently.
        </p>
      </main>
    </div>
  );
}

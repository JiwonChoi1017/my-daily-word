import Link from "next/link";
import React from "react";

const MainNavigation = () => {
  return (
    <header>
      <div>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/vocabulary/list">List</Link>
          </li>
          <li>
            <Link href="/vocabulary/quiz/quiz-id">Quiz</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;

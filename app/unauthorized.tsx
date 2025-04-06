import React from 'react';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <form>
        <button className="hover:underline" type="submit">
          Log out
        </button>
      </form>
    </div>
  );
}

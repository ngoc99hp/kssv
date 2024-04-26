import React from "react";

const Home = () => {
  return (
    <div>
      <p>long content</p>
      {Array.from({ length: 100 }, (_, index) => (
        <React.Fragment key={index}>
          {index % 20 === 0 && index ? "more" : "..."}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;

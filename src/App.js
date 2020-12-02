import React from "react";
import "./App.css";

let MOBILE_BP = 360;
let BREAKPOINT = window.innerWidth;

function App() {
  const fadeRef = React.useRef();
  const [style, setStyle] = React.useState({
    bg: "",
    height: "",
    toggle: false,
    fadeIn: "",
    leftDotIsactive: "active",
    rightDotIsactive: "",
  });
  const [count, setCount] = React.useState({ count: 0 });

  const handleNavUp = () => {
    setStyle((prevState) => ({
      ...prevState,
      height: "60vh",
    }));
  };
  const handleNavDown = () => {
    setStyle((prevState) => ({
      ...prevState,
      height: "10vh",
    }));
  };

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      setStyle((prevState) => ({
        ...prevState,
        bg: "#47787F",
        leftDotIsactive: "",
        rightDotIsactive: "active",
      }));
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      setStyle((prevState) => ({
        ...prevState,
        bg: "#0E1A2C",
        filterBg: "brightness(1.05)",
        leftDotIsactive: "active",
        rightDotIsactive: "",
      }));
      setTimeout(() => {
        setStyle((prevState) => ({
          ...prevState,

          filterBg: "brightness(1)",
        }));
      }, 200);
    }
    setCount((prevCount) => ({
      ...prevCount,
      [e.target.getAttribute("name")]: !prevCount[e.target.getAttribute("name")]
        ? prevCount.count + 1
        : prevCount[e.target.getAttribute("name")]++,
    }));
  };
  const handleChangeColor = (e) => {
    setStyle((prevState) => ({
      ...prevState,
      toggle: !prevState.toggle,
      bg: prevState.toggle ? "#0E1A2C" : "#47787F",
      leftDotIsactive: prevState.toggle ? "active" : "",
      rightDotIsactive: !prevState.toggle ? "active" : "",
    }));
    setCount((prevCount) => ({
      ...prevCount,
      [e.target.getAttribute("name")]: !prevCount[e.target.getAttribute("name")]
        ? prevCount.count + 1
        : prevCount[e.target.getAttribute("name")]++,
    }));
  };
  const handlers =
    BREAKPOINT <= MOBILE_BP
      ? {
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
        }
      : { onClick: handleChangeColor };
  return (
    <div className="App">
      <div onClick={handleNavDown} style={{ filter: style.filterBg }}></div>
      <nav
        onClick={handleNavUp}
        style={{ height: style.height, transition: "height 0.5s" }}
      >
        <div className="dots">
          <button className={style.leftDotIsactive}></button>
          <button className={style.rightDotIsactive}></button>
        </div>
        <div className="faded"></div>
        <div className="scrolling-divs">
          {Array.from("spation").map((el) => {
            return (
              <div
                key={el}
                ref={fadeRef}
                name={el}
                {...handlers}
                style={{
                  backgroundColor: style.bg,
                  transition: "background-color 0.7s",
                }}
              >
                <b
                  style={{
                    color: "red",
                    fontSize: "25px",
                    marginRight: "-75%",
                  }}
                >
                  {count[el]}
                </b>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;

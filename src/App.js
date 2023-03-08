import CustomCarousel from "./carousel/CustomCarousel";

const images = [
  { url: "https://image.tmdb.org/t/p/w500/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg" },
  { url: "https://image.tmdb.org/t/p/w500/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg" },
  { url: "https://image.tmdb.org/t/p/w500/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg" },
  { url: "https://image.tmdb.org/t/p/w500/22z44LPkMyf5nyyXvv8qQLsbom.jpg" },
  { url: "https://image.tmdb.org/t/p/w500/xnAi4BRoO3ZQ3wwxGn6UNoxQzDq.jpg" },
  { url: "https://image.tmdb.org/t/p/w500/32GH8Mi4GmTPIQyd6IW1FFrHWrj.jpg" }
]

function App() {
  return (
    <div className="App">
      <CustomCarousel 
        data={images}
      />
    </div>
  );
}

export default App;

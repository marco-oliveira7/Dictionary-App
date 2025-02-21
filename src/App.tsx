import { IconSearch } from "@tabler/icons-react";
import FavoriteWords from "./components/FavoriteWords/FavoriteWords";
import { IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([
    {
      word: "",
    },
  ]);
  const [word, setWord] = useState("");
  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    const saved = document.querySelector(".saved");
    saved?.addEventListener("click", () => {
      saved.classList.toggle("red");
    });
  });

  function handleFavorite(word: string) {
    for (let i = 0; i < favorites.length; i++) {
      if(favorites[i].word !== word){
        setFavorites((f) => [...f, {word: word}]);
      }else{
        console.log('esta palavra ja esta nos favoritos');
      }
      
    }
    console.log(favorites);
  }

  function handleWord(e: any) {
    setWord(e.target.value);
    if (e.target.value === "") {
      setRes(null);
    }
  }

  function getWord() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.title === "No Definitions Found") {
          alert(res.title);
        }
        if (res) {
          setRes(res[0]);
        } else {
          setRes(null);
        }
      })
      .catch((err) => console.log(err));
  }

  function deleteWord(i: number) {}

  return (
    <div className="text-white w-screen h-screen flex flex-col justify-center items-center bg-[#13171C]">
      <div className="border-2 rounded-2xl w-1/3 h-1/10 mb-10 flex items-center">
        <input
          value={word}
          onChange={handleWord}
          type="text"
          className="w-full h-full outline-0 text-2xl px-2"
        />
        <IconSearch onClick={getWord} className=" mx-4 w-10 h-10"></IconSearch>
      </div>

      <div className="border-amber-50 border-2 rounded-2xl w-1/3 px-8 py-6">
        {res ? (
          <div className="flex flex-col justify-center relative">
            <h1 className="text-2xl self-center uppercase">{res.word}</h1>
            <IconHeart
              className="mx-4 saved self-end absolute top-2"
              onClick={() => handleFavorite(res.word)}
            />
            {res.meanings && res.meanings.length > 0 && (
              <>
                <div className="my-2">
                  <h1 className="text-xl text-slate-300">Part Of Speech</h1>
                  <h1 className="text-xl ml-2">
                    {res.meanings[0].partOfSpeech}
                  </h1>
                </div>
                <div className="my-2">
                  <h1 className="text-xl text-slate-300">Definition</h1>
                  {res.meanings.length >= 0 ? (
                    <h1 className="text-xl ml-2">
                      {res.meanings[0].definitions[0].definition}
                    </h1>
                  ) : (
                    <h1 className="text-md ml-2">
                      There is no definition for this word
                    </h1>
                  )}
                </div>
                <div className="my-2">
                  <h1 className="text-xl text-slate-300">Example</h1>
                  {res.meanings[0].definitions[0].example ? (
                    <h1 className="text-xl ml-2">
                      {res.meanings[0].definitions[0].example}
                    </h1>
                  ) : (
                    <h1 className="text-md ml-2">
                      There is no example for this word
                    </h1>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-center my-4 text-2xl">Favorite Words</h1>
            <FavoriteWords />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

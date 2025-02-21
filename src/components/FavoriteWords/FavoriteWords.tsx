import { IconHeart, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

interface FavoriteWordsProps{
  deleteWord: () => void
}

const FavoriteWords = () => {

  useEffect(() => {
    const saved = document.querySelector('.saved')
    saved?.addEventListener('click', () => {
      saved.classList.toggle('red')
    })
  })

  return (
    <div className="w-full flex justify-between px-4 my-6 items-center border-amber-50 border-2 h-17 rounded-xl">
      <p className="text-xl">word</p>
      <div className="flex">
        <IconHeart className="mx-4 saved"/>
        <IconTrash/>
      </div>
    </div>
  );
};

export default FavoriteWords;

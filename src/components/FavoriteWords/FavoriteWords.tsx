import { IconHeart, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

interface FavoriteWordsProps {
  word: string;
  handleFavorite: () => void;
}

const FavoriteWords = (props: FavoriteWordsProps) => {
  return (
    <div className="w-full flex justify-between px-4 my-6 items-center border-amber-50 border-2 h-17 rounded-xl">
      <p className="text-xl">{props.word}</p>
        <IconHeart onClick={props.handleFavorite} className="mx-4 red" />
    </div>
  );
};

export default FavoriteWords;

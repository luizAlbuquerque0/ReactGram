import "./Search.css";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

//components
import { Link } from "react-router-dom";
import Photoitem from "../../components/Photoitem";
import Message from "../../components/Message";
import LikeContainer from "../../components/LikeContainer";

//Redux
import { searchPhoto, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  //Load photos
  useEffect(() => {
    dispatch(searchPhoto(search));
  }, [dispatch, search]);

  //Like
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Voce está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo.id}>
            <Photoitem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram econtrados resultados para sua busca..
        </h2>
      )}
    </div>
  );
};

export default Search;

import "./Home.css";

//components
import LikeContainer from "../../components/LikeContainer";
import Photoitem from "../../components/Photoitem";
import { Link } from "react-router-dom";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetMessage } from "../../hooks/useResetComponentMessage";

//redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetMessage(dispatch);

  const { user } = useSelector((state) => state.auth);

  const { photos, loading } = useSelector((state) => state.photo);

  //Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //Like
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
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
          Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}></Link>
        </h2>
      )}
    </div>
  );
};

export default Home;

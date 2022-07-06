import "./Photo.css";

import { uploads } from "../../utils/config";

//Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import Photoitem from "../../components/Photoitem";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Redux
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //comments

  //load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [id, dispatch]);

  //like e comentario

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <Photoitem photo={photo} />
    </div>
  );
};

export default Photo;

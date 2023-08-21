import React from "react";
import Avatar from '../../components/Avatar'
import "./Project.css"
import moment from "moment"
import "moment/locale/tr"
const Projectcommentuser = ({proje}) => {
  return (
    <div className="project-comments">
      <h4>Proje Yorumları</h4>
      <ul>
        {proje.yorumlar.length > 0 &&
          proje.yorumlar.map((y) => (
            <li key={y.id}>
              <div className="comment-author">
                <Avatar src={y.photoURL} />
                <p>KullanıcıAdı:{y.kullaniciad}</p>
              </div>
              <div className="comment-date">
                <p>
                  Tarih:
                  {moment(Date(y.tarih)).fromNow()}
                </p>
              </div>
              <div className="comment-content">
                <p>Yorum:{y.yorumtext}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Projectcommentuser;

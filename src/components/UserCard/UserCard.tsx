import * as React from "react";

export interface IUserCardProps {
  userInfo: any;
}

export function UserCard(props: IUserCardProps) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by4">
          <img src={props.userInfo.avatar_url} alt="." />
        </figure>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{props.userInfo.name}</p>
            <p className="subtitle is-6">{props.userInfo.location}</p>
            <a href={props.userInfo.html_url}>@{props.userInfo.login}</a>
          </div>
        </div>

        <div className="content">
          <div className="columns">
            <div className="column">{props.userInfo.followers} Followers</div>
            <div className="column">{props.userInfo.following} Following</div>
          </div>
          <p>{props.userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
}

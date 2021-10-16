import { Component, h, Method, Prop, State } from '@stencil/core';
import { User } from '../../model/anilistModels';
import { getUser } from '../../utils/anilist-gql';

@Component({
  tag: 'anilist-user',
  styleUrl: 'anilist-user.css',
  shadow: true,
})
export class AnilistUser {

  @Prop() username: string;
  @Prop() useDarkMode = true;  // TODO:
  @Prop() hideAnime = false;  // TODO:
  @Prop() hideManga = false;  // TODO:

  @State() user: User;

  @Method()
  async fetchUser(username: string): Promise<User>{
    return getUser(username).then(user => {
      this.user = user;
      return user;
    });
  }

  async componentWillRender() {
    if (this.username) {
      await this.fetchUser(this.username);
    }
  }

  render() {
    return (
      <div>
        Anilist user: {this.username}
        <img src={this.user.avatar} alt="Anilist Avatar"/>
        <ul>
          <li>{this.user.id}</li>
          <li>{this.user.anime.count} anime entries</li>
          <li>{this.user.anime.episodesWatched} episodes watched</li>
          <li>{this.user.anime.minutesWatched} minutes watched</li>
        </ul>
      </div>
    );
  }
}

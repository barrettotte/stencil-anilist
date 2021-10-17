import { Component, h, Method, Prop, State } from '@stencil/core';
import { ANILIST_API } from '../../global/resources';
import { User } from '../../model/anilistModels';
import { getUser } from '../../utils/anilist-gql';

@Component({
  tag: 'anilist-user',
  styleUrl: 'anilist-user.scss',
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

  renderUserUrl() {
    return (<a href={`${ANILIST_API}/user/${this.username}`}>{this.username}</a>);
  }

  renderGenericError() {
    return (<div><p>Error occurred fetching Anilist user {this.renderUserUrl()}.</p></div>);
  }

  render() {
    if (!this.user) {
      return this.renderGenericError();
    }
    return (
      <div class="anilist-container">
        <div class="user-container content-wrapper">
          <figure>
            <img src={this.user.avatar} alt={`Avatar for user ${this.username}`}/>
            <figcaption>{this.renderUserUrl()}</figcaption>
          </figure>
        </div>
        <div class="stats-container">
          <div class="anime-container content-wrapper">
            <ul>
              <li><span class="stat">{this.user.anime.count}</span>anime entries</li>
              <li><span class="stat">{this.user.anime.episodesWatched}</span>episodes watched</li>
              <li><span class="stat">{this.user.anime.minutesWatched}</span>minutes watched</li>
              <li><span class="stat">{this.user.anime.meanScore}</span>mean score</li>
            </ul>
          </div>
          <div class="manga-container content-wrapper">
            <ul>
              <li><span class="stat">{this.user.manga.count}</span>manga entries</li>
              <li><span class="stat">{this.user.manga.chaptersRead}</span>chapters read</li>
              <li><span class="stat">{this.user.manga.volumesRead}</span>volumes read</li>
              <li><span class="stat">{this.user.manga.meanScore}</span>mean score</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

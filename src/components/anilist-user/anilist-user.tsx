import { Component, h, Method, Prop, State } from '@stencil/core';
import { ANILIST_API, ANILIST_LOGO } from '../../global/resources';
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
    return (
      <a href={`${ANILIST_API}/user/${this.username}`}>
        <img class="logo" src={ANILIST_LOGO} alt="Anilist logo"/>
        {this.username}
      </a>
    );
  }

  renderGenericError() {
    return (<div><p>Error occurred fetching Anilist user {this.renderUserUrl()}.</p></div>);
  }

  render() {
    if (!this.user) {
      return this.renderGenericError();
    }
    return (
      <div class="anilist-container flex-container">
        <div class="user-container flex-container">
          <div class="anilist-item">
            <figure>
              <img src={this.user.avatar} alt={`Avatar for user ${this.username}`}/>
              <figcaption>
                <span>{this.renderUserUrl()}</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="stats-container flex-container">
          <div class="anilist-item">
            <div class="stat-label">Anime Stats</div>
            <ul>
              <li>Mean Score<span class="stat">{this.user.anime.meanScore}</span></li>
              <li>Entries<span class="stat">{this.user.anime.count}</span></li>
              <li>Episodes Watched<span class="stat">{this.user.anime.episodesWatched}</span></li>
              <li>Days Watched<span class="stat">{(this.user.anime.minutesWatched/60/24).toFixed(2)}</span></li>
            </ul>
          </div>
          <div class="anilist-item">
            <div class="stat-label">Manga Stats</div>
            <ul>
              <li>Mean Score<span class="stat">{this.user.manga.meanScore}</span></li>
              <li>Entries<span class="stat">{this.user.manga.count}</span></li>
              <li>Chapters Read<span class="stat">{this.user.manga.chaptersRead}</span></li>
              <li>Volumes Read<span class="stat">{this.user.manga.volumesRead}</span></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

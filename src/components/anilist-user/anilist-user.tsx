import { Component, h, Prop } from '@stencil/core';
import { getUser } from '../../utils/anilist-gql';

@Component({
  tag: 'anilist-user',
  styleUrl: 'anilist-user.css',
  shadow: true,
})
export class AnilistUser {

  @Prop() username: string;

  @Prop() useDarkMode = true;
  @Prop() hideAnime = false;
  @Prop() hideManga = false;

  render() {
    return (
      <div>
        Anilist user: {JSON.stringify(getUser("barrettotte"))}
      </div>
    );
  }

}

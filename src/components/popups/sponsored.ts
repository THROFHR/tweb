/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import I18n, { i18n } from "../../lib/langPack";
import Scrollable from "../scrollable";
import PopupPeer from "./peer";

export default class PopupSponsored extends PopupPeer {
  constructor() {
    super('popup-sponsored', {
      titleLangKey: 'Chat.Message.Sponsored.What',
      descriptionLangKey: 'Chat.Message.Ad.Text',
      descriptionLangArgs: [i18n('Chat.Message.Sponsored.Link')],
      buttons: [{
        langKey: 'OK',
        isCancel: true
      }, {
        langKey: 'Chat.Message.Ad.ReadMore',
        callback: () => {
          window.open(I18n.format('Chat.Message.Sponsored.Link', true));
        },
        isCancel: true
      }]
    });

    const scrollable = new Scrollable(undefined);
    scrollable.onAdditionalScroll = () => {
      scrollable.container.classList.toggle('scrolled-top', !scrollable.scrollTop);
      scrollable.container.classList.toggle('scrolled-bottom', scrollable.isScrolledDown);
    };

    this.description.replaceWith(scrollable.container);

    scrollable.container.append(this.description);
    scrollable.container.classList.add('scrolled-top');

    this.show();
  }
}

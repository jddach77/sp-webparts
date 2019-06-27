import {
  SPHttpClient,
  SPHttpClientResponse,
  SPHttpClientConfiguration
} from "@microsoft/sp-http";

import { IListService } from "../services/IListService";
import { IReactSlideSwiperWebPartProps } from "../MagpiePlaylistWebPart";

export interface IMagpiePlaylistProps {
  listService: IListService;
  swiperOptions: IReactSlideSwiperWebPartProps;
  listName: string;
}

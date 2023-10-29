import iCharacter from "../../interface/iCharacter";
import routes from "../../routing";
import { getCharacterIcon, getIdFromRoute } from "../../utils";
import ListItemCustomized, {
  ListItemCustomizedProps,
} from "../../components/ListItemCustomized";

type Props = {
  character: iCharacter;
  mode?: ListItemCustomizedProps["mode"];
};

const CharacterItem = ({ character, mode }: Props) => (
  <ListItemCustomized
    mode={mode}
    icon={getCharacterIcon(character.gender)}
    location={routes.characters.view.replace(
      ":id",
      getIdFromRoute(character.url).toString()
    )}
  >
    {character.name}
  </ListItemCustomized>
);

export default CharacterItem;

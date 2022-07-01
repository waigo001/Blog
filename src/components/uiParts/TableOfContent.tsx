import {
  chakra,
  ListItem,
  OrderedList,
  useColorModeValue,
} from "@chakra-ui/react";

import { useScrollSpy } from "src/hooks/useScrollSpy";

type Props = {
  toc: Toc[];
};

const TableOfContent: React.FC<Props> = (props: Props) => {
  const { toc } = props;
  const linkColor = useColorModeValue("gray.500", "gray.400");
  const linkHoverColor = useColorModeValue("gray.900", "gray.100");

  const extractToc = toc.filter((item) => item.depth === 2 || item.depth === 3);

  const activeId = useScrollSpy(
    extractToc.map(({ id }) => `[id="${id}"]`),

    {
      rootMargin: "0% 0% -80% 0%",
    }
  );

  return (
    <OrderedList spacing={1} styleType="none">
      {extractToc.map(({ text, id, depth }) => (
        <ListItem key={id} title={text} ml={(depth - 1) * 4} my="2">
          <chakra.a
            href={`#${id}`}
            fontSize="sm"
            fontWeight={id === activeId ? "bold" : "medium"}
            aria-current={id === activeId ? "location" : undefined}
            color={id === activeId ? linkHoverColor : linkColor}
            _hover={{
              color: linkHoverColor,
            }}
          >
            {text}
          </chakra.a>
        </ListItem>
      ))}
    </OrderedList>
  );
};

export default TableOfContent;

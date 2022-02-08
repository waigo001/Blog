import {
  chakra,
  ListItem,
  OrderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  toc: Toc[];
};

const TableOfContent: React.VFC<Props> = (props: Props) => {
  const { toc } = props;
  const linkColor = useColorModeValue("gray.500", "gray.400");
  const linkHoverColor = useColorModeValue("gray.900", "gray.100");

  return (
    <OrderedList spacing={1} ml="0" mt="4" styleType="none">
      {toc.map(({ text, id, depth }) => {
        if (!(depth === 2 || depth === 3)) return;
        return (
          <ListItem key={id} title={text} ml={(depth - 1) * 4} my="2">
            <chakra.a
              href={`#${id}`}
              fontSize="sm"
              fontWeight="medium"
              color={linkColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        );
      })}
    </OrderedList>
  );
};

export default TableOfContent;

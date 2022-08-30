import { Flex, Icon, Text } from "@chakra-ui/react";
import { format, isAfter, parseISO } from "date-fns";
import { FaClock, FaRegClock } from "react-icons/fa";

type Props = {
  createdAt: string;
  updatedAt?: string;
  enableItemProp?: boolean;
};

const PostTime: React.FC<Props> = ({
  createdAt = "19700101T000000Z",
  updatedAt = "19700101T000000Z",
  enableItemProp = false,
}) => {
  const createdTime = parseISO(createdAt);
  const updatedTime = parseISO(updatedAt);
  const isUpdated = isAfter(updatedTime, createdTime);

  return (
    <>
      <Flex align="center" gridGap="2" display={isUpdated ? "flex" : "none"}>
        <Icon as={FaRegClock} />
        <Text
          fontSize="sm"
          as="time"
          dateTime={updatedAt}
          itemProp={enableItemProp ? "datemodified" : undefined}
          lineHeight={1}
        >
          {format(updatedTime, "yyyy/MM/dd")}
        </Text>
      </Flex>
      <Flex align="center" gridGap="2" display={!isUpdated ? "flex" : "none"}>
        <Icon as={FaClock} />
        <Text
          fontSize="sm"
          as="time"
          dateTime={createdAt}
          itemProp={enableItemProp ? "datepublished" : undefined}
          lineHeight={1}
        >
          {format(createdTime, "yyyy/MM/dd")}
        </Text>
      </Flex>
    </>
  );
};

export default PostTime;

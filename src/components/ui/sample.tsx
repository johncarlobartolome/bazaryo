import { Box, Flex, Text, Button, Heading } from "@chakra-ui/react";

interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => (
  <Flex
    direction="column"
    justify="space-between"
    flex="1 1 300px"
    p={4}
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="md"
    bg="white"
    minH="300px" // ensures consistent height
  >
    <Box>
      <Heading fontSize="lg" mb={2}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </Box>

    <Button mt={4} colorScheme="teal" alignSelf="flex-start">
      Learn More
    </Button>
  </Flex>
);

const CardGrid = () => {
  const data = [
    { title: "Card 1", description: "Short content." },
    {
      title: "Card 2",
      description:
        "This one has more content to test height consistency. It has multiple lines of text to push the layout. This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.This one has more content to test height consistency. It has multiple lines of text to push the layout.",
    },
    { title: "Card 3", description: "Medium length description here." },
  ];

  return (
    <Flex wrap="wrap" gap={4}>
      {data.map((item, idx) => (
        <Card key={idx} title={item.title} description={item.description} />
      ))}
    </Flex>
  );
};

export default CardGrid;

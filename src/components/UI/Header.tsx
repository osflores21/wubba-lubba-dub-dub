import { Divider, Flex, Text } from "@mantine/core"

function Header() {
  return (
    <Flex justify={"center"} direction={"column"} w={"100%"} gap={"xs"}>
      <Text ta={"center"} fw={600} fz={"h1"} >Wubba Lubba dub dub</Text>
      <Text ta={"center"} fw={600} fz={"lg"} >Base de datos de personajes de Rick y Morty</Text>
      <Divider h={"1px"} />
    </Flex>
  )
}

export default Header
import { Button, Container, Group, Stack } from "@mantine/core";
import { StarIcon } from "@phosphor-icons/react"
import Header from "../components/UI/Header";
import CharacterTable from "../components/CharacterTable";
import FilterSearch from "../components/FilterSearch";
import { useState } from "react";
import type { ICharacter, IInfo } from "../types/api.type";
import CharacterPagination from "../components/CharacterPagination";

export default function Home() {
  const [filtered, setFiltered] = useState<ICharacter[] | null>(null)
  const [filterLoading, setFilterLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState<IInfo | undefined>()
  const [showFavorites, setShowFavorites] = useState(false)

  const handleResults = (characters: ICharacter[], info: IInfo | undefined, loading: boolean) => {
    setFiltered(characters)
    setInfo(info)
    setFilterLoading(loading)
  }

  const handleFavoritesToggle = () => {
    setShowFavorites(!showFavorites)
    setPage(1)
  }

  return (
    <Container size="xl">
      <Header />
      <Stack my="lg" gap="md">
        <Group w="100%" wrap="nowrap" justify="space-between">
          <Group wrap="nowrap" style={{ flex: showFavorites ? 0 : 1 }}>

            {!showFavorites && (
              <FilterSearch
                page={page}
                onResults={handleResults}
                onFiltersChange={() => setPage(1)}
              />
            )}
          </Group>
          {!showFavorites &&
            <Button
              variant={showFavorites ? "filled" : "outline"}
              color={showFavorites ? "#043c6e" : "gold"}
              leftSection={<StarIcon size={16} />}
              onClick={handleFavoritesToggle}
            >
              Ver favoritos
            </Button>
          }
          {showFavorites && (
            <Button
              variant="subtle"
              size="xs"
              onClick={handleFavoritesToggle}
            >
              Regresar
            </Button>
          )}
        </Group>

        <CharacterTable
          filtered={filtered}
          filterLoading={filterLoading}
          showOnlyFavorites={showFavorites}
        />

        {!showFavorites && (
          <CharacterPagination
            info={info}
            page={page}
            onPageChange={setPage}
          />
        )}
      </Stack>
    </Container>
  )
}
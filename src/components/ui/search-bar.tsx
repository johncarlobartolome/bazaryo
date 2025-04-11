import {
  createListCollection,
  HStack,
  Input,
  Group,
  Select,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export default function SearchBar() {
  const SelectCategory = () => {
    const categories = createListCollection({
      items: [
        { label: "Fashion & Accessories", value: "fashion_accessories" },
        { label: "Beauty & Personal Care", value: "beauty_personal_care" },
        { label: "Health & Wellness", value: "health_wellness" },
        { label: "Home & Living", value: "home_living" },
        { label: "Electronics & Gadgets", value: "electronics_gadgets" },
        { label: "Food & Beverage", value: "food_beverage" },
        { label: "Arts, Crafts & Stationery", value: "arts_crafts_stationery" },
        { label: "Baby, Kids & Toys", value: "baby_kids_toys" },
        { label: "Pets & Supplies", value: "pets_supplies" },
        {
          label: "Eco-Friendly & Sustainable",
          value: "eco_friendly_sustainable",
        },
        {
          label: "Books, Hobbies & Collectibles",
          value: "books_hobbies_collectibles",
        },
        { label: "Local Services", value: "local_services" },
        { label: "Made in the Philippines", value: "made_in_ph" },
        { label: "Handmade", value: "handmade" },
        { label: "Organic", value: "organic" },
        { label: "On Sale", value: "on_sale" },
        { label: "Best Sellers", value: "best_sellers" },
        { label: "New Arrivals", value: "new_arrivals" },
      ],
    });
    return (
      <Select.Root
        collection={categories}
        size="md"
        width={"auto"}
        overflow={"true"}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="All Categories" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categories.items.map((category) => (
                <Select.Item item={category} key={category.value}>
                  {category.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    );
  };
  return (
    <HStack gap={0}>
      <SelectCategory />
      <Group attached w="xl">
        <Input placeholder="Search for a product or brand" />
        <IconButton aria-label="Search products" bgColor="teal" color="gray.50">
          <LuSearch />
        </IconButton>
      </Group>
    </HStack>
  );
}

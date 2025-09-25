library(readr)
library(dplyr)

taxa <- read_csv("https://raw.githubusercontent.com/IMERSS/imerss-bioinfo/main/data/Xetthecum/reintegrated-withImages.csv")

# Process the data
taxa_links <- taxa %>%
  # keep only relevant columns
  select(`iNaturalist taxon name`, commonName, hulquminumName) %>%
  # drop rows where hulquminumName is blank or NA
  filter(!is.na(hulquminumName), hulquminumName != "") %>%
  # add the new column with taxon path
  rowwise() %>%
  mutate(taxonLink = paste0("/taxa/", gsub(" ", "_", tolower(`iNaturalist taxon name`)), "/")) %>%
  ungroup() %>%
  # sort alphabetically by hulquminumName
  arrange(hulquminumName)

# Write to CSV
write_csv(taxa_links, "taxonLinks.csv")

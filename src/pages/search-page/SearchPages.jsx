import { inject, observer } from "mobx-react";
import React from "react";
import Pagination from "../../components/pagination";
import SearchBar from "../../components/search-bar";
import EmptyState from "../../components/empty-state";
import ErrorState from "../../components/error-state";
import ImageCard from "../../components/image-card";

const styles = {
  searchBarContainer: {
    padding: "2em 0 2em 0",
  },
  paginationContainer: {
    paddingTop: 30,
  },
};

const emptyState = (
  <EmptyState
    title="No search results."
    description="Perform a new search using the search bar."
  />
);

const SearchPages = ({ searchPageStore }) => {
  const errorState = <ErrorState errors={searchPageStore.errors} />;

  const imageCard = (picture) => (
    <ImageCard picture={picture} key={picture.id} />
  );
  return (
    <div className="container h-100">
      <div className="d-flex flex-column">
        <div style={styles.searchBarContainer}>
          <SearchBar
            query={searchPageStore.search}
            onChange={(event) =>
              searchPageStore.setSearchQuery(event.target.value)
            }
            onSearch={() => searchPageStore.loadPictures()}
            isLoading={searchPageStore.isLoading}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {searchPageStore.errors.length > 0
            ? errorState
            : searchPageStore.listPictures().length === 0
            ? emptyState
            : searchPageStore
                .listPictures()
                .map((picture) => imageCard(picture))}
        </div>
        <div
          className="d-flex justify-content-center"
          style={styles.paginationContainer}
        >
          <Pagination
            totalPages={searchPageStore.totalPages}
            currentPage={searchPageStore.currentPage}
            isLoading={searchPageStore.isLoading}
            onPrevClick={() => searchPageStore.loadPicturesOnPreviousPage()}
            onPageClick={(idx) => searchPageStore.loadPictures(idx)}
            onNextClick={() => searchPageStore.loadPicturesOnNextPage()}
          />
        </div>
      </div>
    </div>
  );
};
export default inject("searchPageStore")(observer(SearchPages));

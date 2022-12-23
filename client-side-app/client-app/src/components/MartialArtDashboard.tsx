import { Grid, Loader } from "semantic-ui-react";
import MartialArtList from "./MartialArtList";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import LoadingComponent from "../app/layout/LoadingComponent";
import MartialArtFilters from "./MartialArtFilters";
import { PagingParams } from "../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";

export default observer(function MartialArtDashboard() {
  const { martialArtStore } = useStore();
  const { loadMartialArts, martialArtRegistry, setPagingParams, pagination } =
    martialArtStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadMartialArts().then(() => setLoadingNext(false));
  }

  //Sta je useEffect?
  useEffect(() => {
    if (martialArtRegistry.size <= 1) loadMartialArts();
  }, [martialArtStore, loadMartialArts, martialArtRegistry.size]);
  if (martialArtStore.loadingInitial && !loadingNext)
    return <LoadingComponent content="Loading Martial Arts..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <MartialArtList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="6">
        <MartialArtFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});

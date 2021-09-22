import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import {
    Grid,
    Row,
    Column
} from '@mycv/mycv-grid'

import HomeContainer from '~/containers/Home'
import PostDetailContainer from '~/containers/PostDetail'
import FollowingContainer from '~/containers/Following'
import ProfileContainer from '~/containers/Profile'
import AllSearchResultsContainer from '~/containers/AllSearchResults'
import HeaderContainer from '~/containers/Header'
import config from '~/config'
import MainSidebarContainer from '~/containers/MainSidebar'
import MessageContainer from '~/containers/Message'
import UploadContainer from '~/containers/Upload'
import { Provider as UserProvider } from '~/state/user'

export default function App() {

    return (
        <Router basename={config.routes.base}>
            <UserProvider />
            <Grid>
                <HeaderContainer />

                <Grid maxWidth={1100} type="wide">
                    <Switch>
                        <Route
                            path={config.routes.message}
                            component={MessageContainer}
                        />
                        <Route
                            path={config.routes.upload}
                            component={UploadContainer}
                        />
                        <Route>
                            <Row>
                                <Column 
                                    size={0}
                                    sizeTablet={4}
                                    sizeDesktop={3}
                                >
                                    <MainSidebarContainer />
                                </Column>

                                <Column 
                                    size={12}
                                    sizeTablet={8}
                                    sizeDesktop={9}
                                >
                                    <Switch>
                                        <Route 
                                            exact 
                                            path={config.routes.home} 
                                            component={HomeContainer} 
                                        />
                                        <Route 
                                            path={config.routes.postDetail}
                                            component={PostDetailContainer}
                                        />
                                        <Route 
                                            path={config.routes.following}
                                            component={FollowingContainer}
                                        />
                                        <Route
                                            path={config.routes.profile}
                                            component={ProfileContainer}
                                        />
                                        <Route
                                            path={config.routes.allSearchResults}
                                            component={AllSearchResultsContainer}
                                        />
                                    </Switch>
                                </Column>
                            </Row>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    )
}
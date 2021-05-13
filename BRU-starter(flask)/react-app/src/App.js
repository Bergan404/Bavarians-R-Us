import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import HomePage from '../src/components/Homepage/index'
import PostForm from '../src/components/auth/PostForm'
import CategoryNavbar from "./components/Navbar/CategoryNavbar";
import DiscussionForm from '../src/components/auth/DiscussionForm';
import PostPage from '../src/components/Posts/index'
import DiscussionPage from '../src/components/Discussion/index'
import AllDiscussions from '../src/components/Discussion/all_discussions'
import AllPosts from '../src/components/Posts/all_posts'
import ShoppingCart from '../src/components/ShoppingCart/index'
import CategoryPage from '../src/components/Navbar/CategoryPage'
import SearchPage from '../src/components/Search/index'

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <CategoryNavbar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/create-post" exact={true}>
          <PostForm />
        </Route>
        <Route path="/create-discussion" exact={true}>
          <DiscussionForm />
        </Route>
        <Route path="/posts/:postId" exact={true}>
          <PostPage />
        </Route>
        <Route path="/discussion/:discussionId" exact={true}>
          <DiscussionPage />
        </Route>
        <Route path="/discussions" exact={true}>
          <AllDiscussions />
        </Route>
        <Route path="/posts" exact={true}>
          <AllPosts />
        </Route>
        <Route path="/cart/:userId" exact={true}>
          <ShoppingCart />
        </Route>
        <Route path="/category/:categoryId" exact={true}>
          <CategoryPage />
        </Route>
        <Route path="/search/:searchTerm" exact={true}>
          <SearchPage />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

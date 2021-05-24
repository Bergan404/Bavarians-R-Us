import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
import ProfilePage from '../src/components/Profile/index'
import Checkout from '../src/components/ShoppingCartCheckout/index'

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
        <ProtectedRoute path="/posts/:postId" exact={true}>
          <PostPage />
        </ProtectedRoute>
        <ProtectedRoute path="/discussion/:discussionId" exact={true}>
          <DiscussionPage />
        </ProtectedRoute>
        <ProtectedRoute path="/discussions" exact={true}>
          <AllDiscussions />
        </ProtectedRoute>
        <ProtectedRoute path="/posts" exact={true}>
          <AllPosts />
        </ProtectedRoute>
        <Route path="/cart/:userId" exact={true}>
          <ShoppingCart />
        </Route>
        <Route path="/checkout/:userId" exact={true}>
          <Checkout />
        </Route>
        <Route path="/profile/:username" exact={true}>
          <ProfilePage />
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

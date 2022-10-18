import React, { useEffect, useState } from "react";

import { Post, Index, CommentsBlock, TagsBlock } from "../components";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const { posts, tags } = useSelector((state) => state.posts);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }
	console.log('dataa',data)

  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        <Post
          id={data.id}
          title={data.title}
          imageUrl={data.imageUrl ? `http://localhost:5000${data.imageUrl}` : ''}
          user={data.user}
          createdAt={"12 июня 2022 г."}
          viewsCount={data.viewsCount}
          commentsCount={3}
          tags={data.tags}
          isFullPost
        >
          <ReactMarkdown children={data.text}/>
        </Post>
        <CommentsBlock
          items={[
            {
              user: {
                fullName: "Вася Пупкин",
                avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
              },
              text: "Это тестовый комментарий 555555",
            },
            {
              user: {
                fullName: "Иван Иванов",
                avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
              },
              text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
            },
          ]}
          isLoading={false}
        >
          <Index />
        </CommentsBlock>
      </Grid>
			<Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tags.status === "loading"} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
    </Grid>
  );
};

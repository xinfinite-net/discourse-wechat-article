# plugin.rb
after_initialize do

  # 在主题视图渲染前修改 @topic_view_posts
  add_to_class(:topic_view, :pre_rendered_data) do |posts|
    posts.each do |post|
      # 假设你有一个特定的用户id
      if post.user_id == 1
        post.cooked = post.raw # 用原始HTML替换cooked内容
      end
    end
  end
end

# name: discourse-wechat-article
# about: Discourse plugin for wechat article
# version: 0.0.5
# authors: liu
# url: https://github.com/xinfinite-net/discourse-wechat-article
# require_relative "../../lib/onebox"
#
# Onebox = Onebox
#
# class Onebox::Engine::BilibiliOnebox
#   include Onebox::Engine
#
#   matches_regexp(/^https?:\/\/(?:www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+)\/?.*$/)
#   always_https
#
#   def video_id
#     match = uri.path.match(/\/video\/av(\d+)(\.html)?.*/)
#     return "aid=#{match[1]}" if match && match[1]
#     match = uri.path.match(/\/video\/BV([a-zA-Z0-9]+)(\.html)?.*/)
#     return "bvid=#{match[1]}" if match && match[1]
#
#     nil
#   rescue
#     return nil
#   end
#
#   def to_html
#     <<-HTML
#       <iframe
#         src='https://player.bilibili.com/player.html?aid=#{video_id}&page=1'
#         scrolling="no"
#         border="0"
#         frameborder="no"
#         framespacing="0"
#         width='640'
#         height='430'
#         allowfullscreen='true'></iframe>
#     HTML
#   end
#
#   def placeholder_html
#     to_html
#   end
# end
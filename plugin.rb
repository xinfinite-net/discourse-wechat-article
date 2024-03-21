# name: discourse-wechat-article
# about: Discourse plugin for wechat article
# version: 0.0.2
# authors: liu
# url: https://github.com/xinfinite-net/discourse-wechat-article
after_initialize do

  # 设置默认白名单
  whitelist = WhitelistedHelper.all_whitelist

  # 从配置文件获取特殊用户列表
  special_usernames = settings.special_usernames.split('|')

  # 在request周期内检查是否为特殊用户
  Tracker.on(:before_rendering) do |info|
    if special_usernames.include?(info[:request].env["HTTP_DISCOURSE_USERNAME"])
      whitelist[:attributes]['style'] = :relaxed  # 允许style属性
      info[:request].env["WHITE_LISTER"] = whitelist
    end
  end
end
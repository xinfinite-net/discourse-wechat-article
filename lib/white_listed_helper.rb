# lib/white_listed_helper.rb
module WhitelistedHelper
  def self.all_whitelist
    # 获取默认白名单
    whitelist = DiscourseNgFilter.select_whitelister_args[:whitelisted]

    # 修改时返回新白名单，保留默认
    whitelist
  end
end
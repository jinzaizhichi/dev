#!/usr/bin/python3

import re
import yaml
import os, sys
import json
import datetime, time

YAML_CONFIG = "./mkdocs.yml"
CONFIG_DATA = {}

FRAME_TXML = "./rss-frame.txml"
ITEM_TXML = "./rss-item.txml"

FRAME_DATA = ""
ITEM_DATA = ""

ARTICLE_DIR = "../wiki"


RSS_VAR = {
  "TITLE" : "Mechaelephant Dev Blog",
  "LINK" : "https://mechaelephant.com/dev",
  "DESCRIPTION" : "Programming, Math, Computer Science",
  "PUBDATE" : "",
  "LASTBUILDDATE": "",
  "ATOMLINK" : "https://mechaelephant.com/rss"
}

gm_now_date = time.strftime("%a, %d %b %Y %H:%M:%S %z", time.gmtime())
#now_date = datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z")

RSS_VAR["PUBDATE"] = gm_now_date
RSS_VAR["LASTBUILDDATE"] = gm_now_date


with open(YAML_CONFIG) as fp:
  try:
    CONFIG_DATA = yaml.safe_load(fp)
  except yaml.YAMLError as e:
    print(e)
    sys.exit(-1)

with open(FRAME_TXML) as fp:
  FRAME_DATA = fp.read()

with open(ITEM_TXML) as fp:
  ITEM_DATA = fp.read()

####
####



item_list = []
for a in CONFIG_DATA["nav"]:
  if a == "index.md": continue

  article_data = ""
  with open( ARTICLE_DIR + "/" + a ) as fp:
    article_data = fp.read()

  _m = re.search( '###### \d+-\d+-\d+', article_data )

  _article_date = ""
  if _m:
    _article_date = _m.group(0)
    _article_date = re.sub( '###### ', '', _article_date)

    _dg = re.search( '(\d{4}).(\d{2}).(\d{2})', _article_date)
    if _dg:
      _yr_s = _dg.group(1)
      _mo_s = _dg.group(2)
      _dy_s = _dg.group(3)
      _dt = datetime.datetime( int(_yr_s), int(_mo_s), int(_dy_s) )
      _article_date = _dt.strftime("%a, %d %b %Y 00:00:00")

  _url = RSS_VAR["LINK"] + "/" + re.sub('\.md', '.html', a)
  _title = re.sub('\.md', '', re.sub( '-', ' ', a))


  _item_str = ITEM_DATA
  _item_str = re.sub( '<!-- ITEM_TITLE -->', _title, _item_str)
  _item_str = re.sub( '<!-- ITEM_LINK -->', _url, _item_str)
  _item_str = re.sub( '<!-- ITEM_DESCRIPTION -->', _title, _item_str)
  _item_str = re.sub( '<!-- ITEM_PUBDATE -->', _article_date, _item_str)
  _item_str = re.sub( '<!-- ITEM_GUID -->', _url, _item_str)

  item_list.append(_item_str)


rss_str = FRAME_DATA
rss_str = re.sub( '<!-- TITLE -->', RSS_VAR["TITLE"], rss_str)
rss_str = re.sub( '<!-- LINK -->', RSS_VAR["LINK"], rss_str)
rss_str = re.sub( '<!-- DESCRIPTION -->', RSS_VAR["DESCRIPTION"], rss_str)
rss_str = re.sub( '<!-- PUBDATE -->', RSS_VAR["PUBDATE"], rss_str)
rss_str = re.sub( '<!-- LASTBUILDDATE -->', RSS_VAR["LASTBUILDDATE"], rss_str)
rss_str = re.sub( '<!-- ATOMLINK -->', RSS_VAR["ATOMLINK"], rss_str)

rss_str = re.sub( '<!-- ITEM_LIST -->', "\n".join(item_list), rss_str)

print(rss_str)


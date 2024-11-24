# https://developer.hashicorp.com/packer/docs/templates/hcl_templates/locals
# locals 変数は file, default value, commandline で変更されない
# ここで設定した値は絶対に書きかえられず直接このファイルを編集しないと変更できない

# locals の利用方法は
# - ここに本来 直接値を入力するわけではない
# `"${concat(aws_instance.blue.*.id, aws_instance.green.*.id)}"`
# `"${var.project_name}-web"`
# のように変数を編集したものを共通で利用したい、という面倒な編集を行ったあとの状態を使いまわしたい、ときに利用する
locals {
  img_fam = "debian-12"
}
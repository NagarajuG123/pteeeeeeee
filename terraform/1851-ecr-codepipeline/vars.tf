variable "environment" {
  default = "dev-all"
}
variable "source_branch_name" {
  default = "development"
}
variable "tf_backend_bucket_name" {
  default = "tf-state-keeper-dev-all"
}
variable "ProjectName" {
  default = "1851"
}
variable "region" {
  default = "us-east-1"
}
variable "repo_id" {
  default = "pt1851/1851-ui3"
}
variable "publication" {
  default = "1851"
}
variable "codebuild_bucket" {
  default = "sc-codebuild-sc"
}
variable "codepipeline_bucket" {
  default = "sc-codepipeline-sc"
}
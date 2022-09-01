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
  default = "stachecow"
}
variable "region" {
  default = "us-east-1"
}
variable "repo_id" {
  default = "pt1851/1851-ui3"
}
variable "codebuild_bucket"  {
  default = "terraform-codebuild-all"
}
variable "codepipeline_bucket" {
  default = "terraform-codepipeline-all"
}

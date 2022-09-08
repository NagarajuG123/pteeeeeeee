variable "environment" {
  default = "dev"
}
variable "source_branch_name" {
  default = "development"
}
variable "tf_backend_bucket_name" {
  default = "tf-state-keeper-alll"
}
variable "ProjectName" {
  default = "1851"
}
variable "region" {
  default = "us-east-1"
}
variable "repo_id" {
  default = "Nagaraju/"
}
variable "publication" {
  default = "1851"
}
variable "codebuild_bucket" {
  default = "terraform-codebuild-all"
}
variable "codepipeline_bucket"{
  default = "terraform-codepipeline-all"
}
 
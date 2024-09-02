terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "eu-west-2"
}

resource "aws_s3_bucket" "organisation_backend_state" {
    bucket = "s3-bucket-blog-mvc-customhaven"
    force_destroy = true
}

resource "aws_s3_bucket_versioning" "bucket_versioning" {
    bucket = aws_s3_bucket.organisation_backend_state.id
    versioning_configuration {
        status = "Enabled"
    }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "sse_configuration" {
    bucket = aws_s3_bucket.organisation_backend_state.bucket
    rule {
        apply_server_side_encryption_by_default {
            sse_algorithm = "AES256"
        }
    }
}

resource "aws_dynamodb_table" "organisation_backend_lock" {
    name = "terraform-state-lock"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "LockID"
    attribute {
        name = "LockID"
        type = "S"
    }
    tags = {
        Name = "terraform-state-lock"
        Environment = "production"
    }
}

# terraform {
#     backend "s3" {
#         bucket         = "s3-bucket-blog-mvc-customhaven"
#         key            = "terraform/state/terraform.tfstate"
#         region         = "eu-west-2"
#         dynamodb_table = "terraform-state-lock"
#         encrypt        = true
#     }
# }
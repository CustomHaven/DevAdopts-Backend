terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
    region = ""
}

resource "aws_s3_bucket" "devadopts_bucket" {
  bucket = ""
}

resource "aws_s3_bucket_versioning" "devadopts_bucket_versioning" {
    bucket = ""
    versioning_configuration {
      status = "Enabled"
    }
}

resource "aws_instance" "http_server" {
  ami = ""
  key_name = "default-ec2"
  instance_type = ""
  vpc_security_group_ids = [aws_security_group.http_server_sg.id]
  subnet_id = data.aws_subnets.subnet.ids[0]
  connection {
    type = "ssh"
    host = self.public_ip
    user = "ec2-user"
    private_key = file(var.aws_key_pair)
  }
}

variable "aws_key_pair" {
    default = "~/aws/aws_keys/default-ec2.pem"  
}
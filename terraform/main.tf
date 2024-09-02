terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }

    backend "s3" {
        bucket         = "s3-bucket-blog-mvc-customhaven"  # The bucket created in backend-state/main.tf
        key            = "terraform/state/terraform.tfstate"
        region         = "eu-west-2"
        dynamodb_table = "terraform-state-lock"  # The DynamoDB table created in backend-state/main.tf
        encrypt        = true
    }

}

provider "aws" {
    region = "eu-west-2"
}

resource "aws_instance" "http_server" {
    ami = "ami-0c0493bbac867d427"
    key_name = "default-ec2"
    instance_type = "t2.micro"
    vpc_security_group_ids = [aws_security_group.http_server_sg.id]
    for_each = toset(data.aws_subnets.default_subnets.ids)
    subnet_id = each.value
    # subnet_id = data.aws_subnets.default_subnets.ids[0]
    connection {
        type = "ssh"
        host = self.public_ip
        user = "ec2-user"
        # private_key = file(var.aws_key_pair)
        private_key = var.aws_key_pair
    }
}

# We have 3 subnets accordingly I think there should be 3 public ips for each subnet dont I need to do a loop? for the output
output "dns_public_ips" {
    value = [for instance in aws_instance.http_server : instance.public_ip]
}

# 13.40.43.201  
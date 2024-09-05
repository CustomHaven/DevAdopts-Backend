resource "aws_default_vpc" "default_vpc" {
}

resource "aws_security_group" "http_server_sg" {
    name = "http_server_sg"
    vpc_id = aws_default_vpc.default_vpc.id
    tags = {
        name = "http_server_sg"
    }
}

resource "aws_security_group_rule" "http_ingress" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.http_server_sg.id
}

resource "aws_security_group_rule" "https_ingress" {
    type                   = "ingress"
    from_port              = 443
    to_port                = 443
    protocol               = "tcp"
    cidr_blocks            = ["0.0.0.0/0"]
    security_group_id = aws_security_group.http_server_sg.id
}


resource "aws_security_group_rule" "ssh_ingress" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.http_server_sg.id
}

resource "aws_security_group_rule" "app_port_ingress" {
    type = "ingress"
    from_port = 3333
    to_port = 3333
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.http_server_sg.id
}

resource "aws_security_group_rule" "egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = -1
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.http_server_sg.id
}


# Elastic Load balancer #########################################


resource "aws_security_group" "elb_sg" {
    name = "elb_sg"
    vpc_id = aws_default_vpc.default_vpc.id
    tags = {
        name = "elb_svg"
    }
}

resource "aws_security_group_rule" "elb_app_port_ingress" {
    type = "ingress"
    from_port = 3333
    to_port = 3333
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.elb_sg.id
}

resource "aws_security_group_rule" "elb_http_ingress" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.elb_sg.id
}

resource "aws_security_group_rule" "elb_https_ingress" {
    type                   = "ingress"
    from_port              = 443
    to_port                = 443
    protocol               = "tcp"
    cidr_blocks            = ["0.0.0.0/0"]
    security_group_id      = aws_security_group.elb_sg.id
}

resource "aws_security_group_rule" "elb_egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = -1
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.elb_sg.id
}